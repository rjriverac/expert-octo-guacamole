// ! models needed

// ? NFT
// ! data attributes:
// todo nft token?
// todo image as string
// todo category as string
// todo current price // could maybe get from transactions?
// todo current Owner / could maybe get from transactions?
// todo [transactions as embedded relationship]
// todo [some sort of interaction counter for trending? -stretch]

// ? transaction schema
// todo type of transaction
// todo from
// todo to
// todo price
// todo date

// // ? collection as stretch
// // todo name
// // todo [nfts in the colletcion in an array reference]

// ? User
// ! attributes: 
// todo username
// todo email
// todo password
// todo owned NFTs as array?
// todo amount of transactions?
// todo recent transactions? (limit 3?)


// ? categories could come from a front-end dropdown



// ! tentative schedule/what people will work on
// hopefully finish back end setup by EOD Thursday
// MVP aim for Tuesday/Wednesday
// * initially could pair/group code the backend Tuesday 9 Nov, or split out working on pages as back end paths are completed

// * MVP home page, explore, login & profile, individual NFT page, navbar,display of the cart

// ! enter 10 NFTs each once db is done
// ! 2 users each to enter not counting admin and null address for seeding purposes -> 10 total users in the db

// * Stretch goals -> working transactions

//

// { 
//   token: 'laksjdfl;ajwefja;sdiuf',
//   image: 'url',
//   category: 'string/dropdown from front end',
//   currentPrice: Number,
//   transactions: [{ _id: asdjfawioeurpaoisdufajhsdlf, type: buy, from: user1, to: user 2, price: 30 fakeCoin, date: a1234j1o2i3u4 }, ],
//   listed: boolean
//   views: Number,
// }