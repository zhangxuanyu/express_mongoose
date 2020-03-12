var express = require('express');
var router = express.Router();
var OrderItemModel=require('../db/order_item');

var OrderModel=require('../db/order');


/* GET home page. */
router.get('/', function(req, res, next) {
  OrderModel.find({},(err,docs)=>{
      if(err){
        res.json({
          code:1,
          msg:'no',
          data:err
        })
      }
      res.json({
        code:0,
        msg:'ok',
        data:docs
      })
  })
    // 用 res.json 方法写接口
    
});

router.get('/all', function(req, res, next) {
  OrderItemModel.aggregate([

        {
          $lookup:
            {
              from: "order",
              localField: "order_id",
              foreignField: "order_id",
              as: "order_info"
            }
      }

    ],function(err,docs){

            if(err){

                console.log(err)
                return;
            }
            // 用 res.json 方法写接口
            res.json({
              code:0,
              msg:'ok',
              data:docs
            })
    })
    
});

module.exports = router;
