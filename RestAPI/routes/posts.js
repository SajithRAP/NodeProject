const express = require('express');
const router = express.Router();

// import the model from postschema
const Post = require('../Models/Post');

// router.get('', (req, res) => {
//     res.send('We are on post page');
// })

router.get('/', async (req, res) => {
    
    try {
        //get all the posts from the DB
        const PostfromDB = await Post.find();
        res.json(PostfromDB);
    } catch(err) {
        res.json({message: err});
    }

})

// submit the post to DB with post schema imported

// 1. without async method
// router.post('/', (req, res) => {
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     });
//     // save to db
//     post.save()
//     .then(data => {
//         res.json(data);
//     })
//     .catch(err => {
//         res.json({message: err});
//     });

//     // console.log(req.body);
// });

// 2. with async method
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    // save to db
    try {
        const savePost = await post.save();
        res.json(savePost);
    } catch(err) {
        res.json({message: err})
    }
});

// Get the post based on the ID
router.get('/:postID', async (req, res) => {
    try {
        const DBPosts = await Post.findById(req.params.postID);
        res.json(DBPosts);
    } catch(err) {
        res.json({message: err})
    }
});

//Delete post
router.delete('/:postID', async (req, res) => {
    try {
        const RemovePostDB = await Post.remove({_id: req.params.postID});
        res.json(RemovePostDB);
    } catch(err) {
        res.json({message: err})
    }
});

// Update/patch on existing
router.patch('/:postID', async (req, res) => {
    try {
        const patchDBData = await Post.updateOne(
            { _id: req.params.postID }, 
            { $set: {title: req.body.title} }
        );
        res.json(patchDBData);
    } catch(err) {
        res.json({message: err})
    }
});

// This equals to posts/specific
router.get('/specific', (req, res) => {
    res.send('We are on post specific page');
})

module.exports = router;