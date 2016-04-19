var Botkit = require('botkit')

var accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
var verifyToken = process.env.FACEBOOK_VERIFY_TOKEN
var port = process.env.PORT

if (!accessToken) throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN is required but missing')
if (!verifyToken) throw new Error('FACEBOOK_VERIFY_TOKEN is required but missing')
if (!port) throw new Error ('PORT is required but missing')

var controller = Botkit.facebookbot({
  access_token: accessToken,
  verify_token: verifyToken
})

var bot = controller.spawn()

controller.setupWebserver(port, function (err, webserver) {
  if (err) return console.log(err)
  controller.createWebhookEndpoints(webserver, bot, function () {
    console.log('Ready Player 1')
  })
})

controller.hears(['hello', 'hi'], 'message_recieved', function (bot, message) {
  bot.reply(message, 'Hello! Welcome to SnapFilta!')
  bot.reply(message, 'I just have to ask a couple of questions before we get started')
  bot.reply(message, 'First, will this be for Personal or Business use?')
  bot.reply(message, {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'Personal',
        buttons: [
          {
            type: 'postback',
            title: 'Personal',
            payload: 'respond_personal'
          },
          {
            type: 'postback',
            title: 'Business',
            payload: 'respond_business'
          },
        ]
      }
    }
  })
})

controller.on('facebook_postback', function (bot, message {
  switch (message.payload) {
    case 'respond_personal':
      bot.reply(message, {
        attachment: {
          type: 'image',
          payload: {
            url: ''
          }
        }
      })
      break;
      case 'respond_business':
        bot.reply(message, {
          attachment: {
            type: 'image',
            payload: {
              url: ''
            }
          }
        })
        break;


    default;
  }
})
