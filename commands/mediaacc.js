module.exports = {
    name: 'mediaacc',
    description: "mediaacc",
    execute(message, args, Discord, client) {
        const userId = args[0]; // Assuming the user's Discord ID is passed as the first argument

        const requiredRoleId = 'CHANGEME'; // Role Id of the role you want to be able to use this command 
        const hasRequiredRole = message.member.roles.cache.some(role => role.id === requiredRoleId);
        
        if (!hasRequiredRole) {
            return message.reply("You don't have permission to use this command.");
        }
        

        if (!userId) {
            message.channel.send("Please provide a user's Discord ID.");
            return;
        }

        const user = client.users.cache.get(userId);

        if (!user) {
            message.channel.send("User not found.");
            return;
        }

        const pingMessage = `${user.toString()}`;
        
        message.channel.send(pingMessage)
            .then(() => {
                const newEmbed = new Discord.MessageEmbed()
                    .setColor('#002cff')
                    .setTitle('Media Application Response')
                    .setDescription(`You have been accepted into the Media Team!`)
                    

                newEmbed
                    .setImage('Link to your image if you want one') // if you cant get it to work, post the pic in a discord channel and copy the link to it and paste it here
                    .setFooter('If you have any questions please feel free to ask in a ticket!');

                message.channel.send(newEmbed);
            })
            .then(() => {
                message.delete().catch(error => {
                    console.error('Error deleting user message:', error);
                });
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    }
};
