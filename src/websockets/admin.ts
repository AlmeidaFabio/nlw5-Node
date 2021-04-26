import { io } from "../app";
import { ConnectionService } from "../services/ConnectionService";
import { MessageService } from "../services/MessageService";

io.on("connect", async (socket) => {
    const connectiionService = new ConnectionService();
    const messagesService = new MessageService();

    const allConnectionsWithoutAdmin = await connectiionService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

    socket.on("admin_list_messages_by_user", async (params, callBack) => {
        const { user_id } = params;

        const allMessages = await messagesService.listByUser(user_id);

        callBack(allMessages);
    });

    socket.on("admin_send_message", async (params) => {
        const { user_id, text } = params;

        await messagesService.create({
            text,
            user_id,
            admin_id: socket.id
        });

        const { socket_id } = await connectiionService.findByUserId(user_id);

        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket.id
        });
    }); 
    
    socket.on("admin_user_in_support", async (params) => {
        const {user_id} = params;
        await connectiionService.updateAdminId(user_id, socket.id);

        const allConnectionsWithoutAdmin = await connectiionService.findAllWithoutAdmin();

        io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
    })
});