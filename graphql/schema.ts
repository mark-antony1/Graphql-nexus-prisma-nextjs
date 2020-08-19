import { schema, use } from "nexus";
import { prisma } from "nexus-plugin-prisma";
import { stringArg } from '@nexus/schema'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import cookie from "cookie"

function validatePassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

schema.objectType({
  name: "user",
  definition(t) {
    t.model.id();
		t.model.firstName();
		t.model.lastName();
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
				firstName: stringArg({ nullable: false}),
				lastName: stringArg({ nullable: false}),
				inviteCode: stringArg({ nullable: false})
			},
			async resolve(_parent, _args, ctx) {
				const { firstName, lastName, password, email, inviteCode } = _args



				if (inviteCode !== process.env.ENV_LOCAL_INVITE_SECRET) {
					throw Error("Invalid invite code")
				}
				const salt =bcrypt.genSaltSync();

				const user = await ctx.db.user.create({
					data: {
						email: email,
						first_name: firstName,
						last_name: lastName,
						password: bcrypt.hashSync(password, salt),
					},
				});
				const token = jwt.sign(
					{ email: user.email, id: user.id, time: new Date() },
					process.env.ENV_LOCAL_JWT_SECRET,
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
		t.field("login", {
			type: "user",
			args: {
				email: stringArg({ nullable: false }),
				password: stringArg({ nullable: false }),
			},
			async resolve(_parent, _args, ctx) {
				const { email, password } = _args
				const salt = bcrypt.genSaltSync();

				const user = await ctx.db.user.findOne({
					where: {
						email: email
					}
				});
				if (user && validatePassword(user, password)) {
					const token = jwt.sign(
						{ email: user.email, id: user.id, time: new Date() },
						process.env.ENV_LOCAL_JWT_SECRET,
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
				throw new Error("Invalid email and password combination");
    	}
		})
		t.field("validateUser", {
			type: "String",
			args: {},
			async resolve(_parent, _args, ctx) {
				const { token } = cookie.parse(ctx.req.headers.cookie ?? "");
				if (token) {
					try {
						jwt.verify(token, process.env.ENV_LOCAL_JWT_SECRET);
						return "ok"
    			} catch {
						throw new Error("Invalid email and password combination");
					}
				}
				throw new Error("Invalid email and password combination");
			}
		})
    t.crud.deleteOneuser();
    t.crud.deleteManyuser();
    t.crud.updateOneuser();
    t.crud.updateManyuser();
  },
});

use(prisma({ features: { crud: true } }));