import { schema, use } from "nexus";
import { prisma } from "nexus-plugin-prisma";


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
		t.crud.createOneuser();
    t.crud.deleteOneuser();
    t.crud.deleteManyuser();
    t.crud.updateOneuser();
    t.crud.updateManyuser();
  },
});

use(prisma({ features: { crud: true } }));