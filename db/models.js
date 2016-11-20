const Sequelize = require('sequelize');

const db = new Sequelize(
    'postgres://eric:1234@localhost:5432/secrets',
    {logging: false}
);

const SecretModel = db.define('secret', {
	text: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});

const CommentModel = db.define('comment', {
	text: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});

CommentModel.belongsTo(SecretModel);

module.exports = {
    Secret: SecretModel,
    Comment: CommentModel
};