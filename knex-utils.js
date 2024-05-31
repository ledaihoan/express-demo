const delay = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

function addTimestampColumns(tableBuilder) {
  tableBuilder
    .timestamp('created_at', { useTz: true, precision: 0 })
    .comment('Creation timestamp');

  tableBuilder
    .timestamp('updated_at', { useTz: true, precision: 0 })
    .comment('Last updated timestamp');
}

function addSoftDeleteColumns(tableBuilder) {
  tableBuilder.timestamp('deleted_at').comment('Deletion timestamp');

  tableBuilder
    .boolean('is_deleted')
    .comment('Whether the entity is deleted')
    .defaultTo(false);
}

module.exports = {
  delay,
  addTimestampColumns,
  addSoftDeleteColumns
};
