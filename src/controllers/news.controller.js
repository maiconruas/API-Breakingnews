import newsService from '../services/news.service.js';

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            return res.status(400).send({ message: 'Submit all fields for registration' });
        }

        await newsService.createService({
            title,
            text,
            banner,
            user: req.userId,
        })

        return res.status(201).send('OK');

    } catch (err) {
        return res.status(500).send({ message: err.message })
    };
};

const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const news = await newsService.findAllService(offset, limit);
        const total = await newsService.countNews();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) {
            return res.status(400).send({ message: "there are no registered news" })
        }
        return res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar,
            }))
        });
    } catch (err) {
        return res.status(500).send({ message: err.message })
    };


};

const topNews = async (req, res) => {
    try {
        const news = await newsService.topNewsService();
        if (!news) {
            return res.status(400).send({ message: "There is no registered post" });
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar,
            }
        });
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }

};

const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await newsService.findByIdService(id)

        return res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar,
            }
        });

    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        const news = await newsService.searchByTitleService(title);

        if (news.length === 0) {
            return res.status(400).send({ message: "there are no news with this title" })
        }

        return res.send({
            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar,
            })),
        });
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const byUser = async (req, res) => {
    try {
      const id = req.userId;
      const news = await newsService.byUserService(id);
  
      return res.send({
        results: news.map((item) => ({
          id: item._id,
          title: item.title,
          text: item.text,
          banner: item.banner,
          likes: item.likes,
          comments: item.comments,
          name: item.user.name,
          username: item.user.username,
          userAvatar: item.user.avatar,
        })),
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  const update = async (req, res) => {
    try {
      const { title, text, banner } = req.body;
      const { id } = req.params;
  
      if (!title && !banner && !text) {
        res.status(400).send({
          message: "Submit at least one field to update the post",
        });
      }
      
      const news = await newsService.findByIdService(id)
  
      if (news.user._id != req.userId) {
        return res.status(400).send({
          message: "You didn't update this News",
        });
      }
  
      await newsService.updateService(id, title, text, banner);
  
      return res.send({ message: "Post successfully updated!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

export default { 
    create, 
    findAll, 
    topNews, 
    findById, 
    searchByTitle, 
    byUser,
    update
 };
