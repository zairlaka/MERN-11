const { models } = require("./index");
const { Op } = require('sequelize')

module.exports = {
  createRequest: async (body) => {
    try {
      const request = await models.requests.create({
        ...body,
      });
      return {
        response: request,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  getAllRequests: async (offset, query) => {
    let search = query.search
    try {
      const users = await models.requests.findAll({
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

        order: [[query.sortValue, query.sortOrder]],

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


  deleteRequest: async (userId) => {
    try {
      const user = await models.requests.destroy({
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
  updateRequest: async (body) => {
    try {
      const user = await models.requests.update({ ...body }, {
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
