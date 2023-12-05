exports.up = knex => knex.schema.createTable("videos", table => {
    table.increments("id");
    table.integer("user_Id").references("id").inTable("users").onDelete("CASCADE");
    table.text("title").notNullable();
    table.text("description").nullable();
  
    table.timestamp("created_at").default(knex.fn.now());
});
  
exports.down = knex => knex.schema.dropTable("videos");