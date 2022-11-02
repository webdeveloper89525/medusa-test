import { Router } from 'express';
import bodyParser from 'body-parser';
import { projectConfig } from "../../medusa-config"
import cors from "cors"

export default () => {
  const router = Router();
  const storeCorsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true,
  }
  router.use(bodyParser.json())

  router.options("/store/post", cors(storeCorsOptions))
  router.post('/store/post', cors(storeCorsOptions), async (req, res) => {
    const postService = req.scope.resolve('postService');
    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        msg: 'Name not supplied.',
      });
      return;
    }
    const post = await postService.create(name);
    console.log(post);
    res.json({ msg: 'Post created', id: post.id });
  });


  router.use(bodyParser.json())
  router.options("/store/post", cors(storeCorsOptions))
  router.get('/store/post', cors(storeCorsOptions), async (req, res) => {
    const postService = req.scope.resolve('postService');
    res.json(await postService.list());
  });

  return router;
};