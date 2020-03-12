var express = require('express');
var router = express.Router();

var user_model = require('../db/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  user_model.find({},(err,docs)=>{
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
});

router.post('/', (req, res)=> {
  console.log(req.body)
  user_model.create(req.body, (err, doc) => {
    if (err) {
      res.json(err)
    } else {
      res.json({
        code:0,
        msg:'ok',
        data:"新增成功"
      })
    }
  })
  
});

router.delete('/:id',(req,res) => {
  user_model.findOneAndRemove({
        _id : req.params.id
        })
       .then(data => res.send(`${data.name}删除成功`))
       .catch(err => res.json(err))
})

router.put('/:id',(req,res) => {
  user_model.findOneAndUpdate({ _id : req.params.id}
    ,{ $set : { name: req.body.name,
      age : req.body.age}
      },{
        new : true
      })
    .then(movie => res.json(movie))
    .catch(err => res.json(err))
})

module.exports = router;
