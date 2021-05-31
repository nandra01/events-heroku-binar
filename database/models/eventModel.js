const Event = (instance, dataType) => {
    return instance.define('event', {
        id:{
            type: dataType.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataType.INTEGER(11)
        },
        name:{
            type: dataType.STRING(100)
        },
        description:{
            type: dataType.STRING(100)
        },
        created_at:{
            type: dataType.DATE(30)
        },
        updated_at:{
            type: dataType.DATE(30)
        }
    },{
        tableName: 'event',
        underscored: true,
        timestamps: true,
    })
  }
  
  module.exports = Event;