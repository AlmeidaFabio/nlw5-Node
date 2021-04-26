import { Router } from "express";
import { MessagesController } from "../controllers/MessagesController";
import { SettingsController } from "../controllers/SettingsController";
import { UsersController } from "../controllers/UsersController";

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

const router = Router();

router.get('/ping', (request, response) => {
    return response.json({pong:true});
})

router.get('/chat', (request, response) => {
    return response.render("html/client.html")
});

router.get('/chat/admin', (request, response) => {
    return response.render("html/admin.html")
})

router.post('/setting', settingsController.create);
router.get('/settings/:username', settingsController.findByUsername);
router.put('/settings/:username', settingsController.update);

router.post('/user', usersController.create);

router.post('/message', messagesController.create);
router.get('/messages/:id', messagesController.showByUser);

export { router }