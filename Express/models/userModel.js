const { models } = require("./index");
const { Op } = require('sequelize')

module.exports = {
  createUser: async (body, userId) => {
    try {
      const user = await models.users.create({
        userId,
        ...body,
      });
      return {
        response: user,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  getUserByEmail: async (email) => {
    try {
      const user = await models.users.findOne({
        where: {
          email: email,
        },
        attributes: {
          exclude: ["password"],
        }
      });
      if(!!!user){
        return { error: `Sorry, couldn't find the user by this ${email}.`}
      }
      return {
        response: user,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  getAllUsers: async (offset, query) => {
    let search = query.search
    try {
      const users = await models.users.findAll({
        // attributes : ["firstName", "lastName", "role", "email"]
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        },
        where: [
          {
            ...search.userId ? {userId: search.userId} : true
          },{
            ...search.firstName ? { firstName: { [Op.like]: search.firstName }} : true
          },{
            ...search.lastName ? { lastName: { [Op.like]: search.lastName }} : true
          },{
            ...search.firstName ? { firstName: { [Op.like]: search.firstName }} : true
          },{
            ...search.role ? { role: { [Op.in]: [search.role] }} : true
          },
        ],
        // where: { 
        //   [Op.or]: [
        //     {
        //       firstName: query.search
        //     }, {
        //       lastName: query.search
        //     }, {
        //       email: query.search
        //     }
        //   ]
        // },

        order: [[query.sortValue, query.sortOrder]],
        // order: [[sequelize.literal('lastName, email'), 'DESC']],
      //   order: [
      //     ['lastName', 'desc'],
      //     ['email', 'asc']
      //  ],
        offset: offset,
        limit: query.limit,
      });
      return {
        response: users,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  getUserById: async (userId) => {
    try {
      const user = await models.users.findByPk(userId,{attributes: {
        exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      }})
      if(!!!user){
        return { error: "Sorry, couldn't find the user by that ID."}
      }
      return { response: user }
    } catch (error) {
      return { error: error }
    }
  },

  deleteUser: async (userId) => {
    try {
      const user = await models.users.destroy({
        where: {
          userId: userId,
        },
      });
      if(!!!user){
        return { error: "Sorry, couldn't find the user"}
      }
      return {
        response: user,
      };
    } catch (error) {
      return { error: error }
    }
  },
  updateUser: async (body) => {
    try {
      const user = await models.users.update({ ...body }, {
        where: {
          userId: body.userId
        }
      });
      if(!!!user){
        return { error: "Sorry, couldn't find the user"}
      }
      return {
        response: user,
      };
    } catch (error) {
      return { error: error }
    }
  },
};
