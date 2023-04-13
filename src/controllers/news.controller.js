import newsService from '../services/news.service.js';

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            res.status(400).send({ message: 'Submit all fields for registration' });
        }

        await newsService.createService({
            title,
            text,
            banner,
            user: { _id: "6436fa83de8150ee3d8d2e00" },
        })

        res.send(201);
    } catch (err) {
        res.status(500).send({ message: err.message })
    };
};

const findAll = async (req, res) => {
    const news = await newsService.findAllService();
    if (news.length === 0) {
        return res.sttatus(400).send({ message: "there are no registered news" })
    }
    res.send(news);
};

export default { create, findAll };
