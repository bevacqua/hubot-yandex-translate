'use strict';

var languages = require('../lib/languages');

function getCode (language, basic) {
  var lang = (language || '').toLowerCase();
  return languages.indexOf(lang) === -1 ? basic : lang;
}

function yandexTranslate (robot) {
  var choices = languages.sort().join('|');
  var pattern = '' +
    '(?: t|tr|tra(?:duc(?:e|ir?)|nslate))' +
    '(?: (' + choices + '))?' +
    '(?:[\s-]+(' + choices + '))?' +
    '(.*)';
  var rparts = new RegExp(pattern, 'i');

  robot.respond(rparts, request);

  function request (command) {
    var input = command.match[3].trim();
    var term = '"' + input + '"';
    var origin = getCode(command.match[1], 'auto');
    var target = getCode(command.match[2], 'en');
    var lang = origin === 'auto' ? target : origin + '-' + target;
    var q = {
      key: process.env.YANDEX_TRANSLATE_API_KEY,
      lang: lang,
      text: input
    };

    command
      .http('https://translate.yandex.net/api/v1.5/tr.json/translate')
      .query(q)
      .header('User-Agent', 'Mozilla/5.0')
      .get()(response);

    function response (err, res, body) {
      var parsed = parse(body);
      if (parsed) {
        command.send('HODOR hodor. ' + parsed.text);
      }
    }
  }
}

function parse (json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return { text: 'No.' };
  }
}

module.exports = yandexTranslate;
