module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'codeminer',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
