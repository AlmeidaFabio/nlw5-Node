import { io } from '../app';
import { ConnectionService } from '../services/ConnectionService';
import { MessageService } from '../services/MessageService';
import { UserService } from '../services/UserService';

io.on("connect", (socket) => {
    const connectionsService = new ConnectionService();
    const usersService = new UserService();
    const messagesService = new MessageService();

    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id;
        const { text, email } = params;
        let user_id = null;

        const userExists = await usersService.findByEmail(email);

        if(!userExists) {
            const user = await usersService.create(email);

            await connectionsService.create({
                socket_id,
                user_id:user.id
            })

            user_id = user.id;
        } else {
            user_id = userExists.id;

            const connection = await connectionsService.findByUserId(user_id);

            if(!connection) {
                await connectionsService.create({
                    socket_id,
                    user_id:userExists.id
                })
            } else {
                connection.socket_id = socket_id;

                await connectionsService.create(connection);
            }
            
        }

        await messagesService.create({
            text,
            user_id
        })

        const allMessages = await messagesService.listByUser(user_id);

        socket.emit("client_list_all_messages", allMessages);

        const allUsers = await connectionsService.findAllWithoutAdmin();
        io.emit("admin_list_all_users", allUsers);
    })

    socket.on("client_send_to_admin", async (params) => {
        const {text, socket_admin_id} = params;
        const {user_id} = await connectionsService.findBySocketId(socket.id);
        const socket_id = socket.id;
        
        const message = await messagesService.create({
            text,
            user_id
        });

        io.to(socket_admin_id).emit("admin_receive_message", {
            message,
            socket_id
        });
    });
});