// lỗi bảo mật không cho phép  truy cập trường dữ liệu 1 cach truc tiep nên phải làm như vầy 

module.exports = {
    mutipleMongooseToObject: function(mongooses){
        return mongooses.map(mongoose => mongoose.toObject())
    },
    mongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
};
