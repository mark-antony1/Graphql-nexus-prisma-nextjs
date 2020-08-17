import { schema, use } from "nexus";
import { prisma } from "nexus-plugin-prisma";
import { stringArg } from '@nexus/schema'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import cookie from "cookie"

schema.objectType({
  name: "user",
  definition(t) {
    t.model.id();
		t.model.first_name();
		t.model.last_name();
		t.model.email();
		t.model.password();
		t.model.created_at();
		t.model.updated_at();
  },
});

schema.queryType({
  definition(t) {
    t.list.field("allUsers", {
      type: "user",
      resolve(_parent, _args, ctx) {
        return ctx.db.user.findMany();
      },
		});
		t.crud.user();
		t.crud.users();
  },
});

schema.mutationType({
  definition(t) {
    t.field("bigRedButton", {
      type: "String",
      async resolve(_parent, _args, ctx) {
        const { count } = await ctx.db.user.deleteMany({});
        return `${count} user(s) destroyed. Thanos will be proud.`;
      },
		});
		t.field("signup", {
			type: "user",
			args: {
				email: stringArg({ nullable: false }),
				password: stringArg({ nullable: false }),
				first_name: stringArg({ nullable: false}),
				last_name: stringArg({ nullable: false})
			},

			async resolve(_parent, _args, ctx) {
				const salt = bcrypt.genSaltSync();

				const user = await ctx.db.user.create({
					data: {
						email: _args.email,
						first_name: _args.first_name,
						last_name: _args.last_name,
						password: bcrypt.hashSync(_args.password, salt),
					},
				});
				const token = jwt.sign(
					{ email: user.email, id: user.id, time: new Date() },
					process.env.JWT_SECRET,
					{
						expiresIn: "6h",
					}
				);

				ctx.res.setHeader(
					"Set-Cookie",
					cookie.serialize("token", token, {
						httpOnly: true,
						maxAge: 6 * 60 * 60,
						path: "/",
						sameSite: "lax",
						secure: process.env.NODE_ENV === "production",
					})
				);

				return user;
			}
		})
		t.crud.createOneuser();
    t.crud.deleteOneuser();
    t.crud.deleteManyuser();
    t.crud.updateOneuser();
    t.crud.updateManyuser();
  },
});

use(prisma({ features: { crud: true } }));