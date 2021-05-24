const { Book } = require("../../models");

const books = [
    new Book({
        title: 'Волк и семеро козлят',
        description: 'Сказка, обернувшаяся трагедией',
        authors: 'народ',
        fileCover: 'https://russkaja-skazka.ru/wp-content/uploads/2017/10/volk-i-semero-kozlyat-russkaya-narodnaya-skazka-chitat.jpg',
        fileName: 'Волк и семеро козлят'
    }),
    new Book({
        title: 'Колобок',
        description: 'Любовь, предательство и возмездие',
        authors: 'народ',
        fileCover: 'https://avatars.mds.yandex.net/get-zen_doc/246252/pub_5bfef6ac1bae810ad5805cb7_5bffe57849dd7000a94226a1/scale_1200',
        fileName: 'Колобок'
    })
];

module.exports = {
    books
}
