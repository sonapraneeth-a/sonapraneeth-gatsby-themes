const crypto = require("crypto");

module.exports = {
  /* createCollections: (mdxItems, createNodeId) => {
    const collections = [];
    for (let idx = 0; idx < mdxItems.length; idx++) {
      const mdxItem = mdxItems[idx];
      module.exports.updateCollection(mdxItem, collections, createNodeId);
    }
    return collections;
  },*/
  updateCollection: (
    mdxItem,
    collections,
    baseUrl,
    collectionName,
    subCollectionName,
    createNodeId,
  ) => {
    console.log(`Adding: ${collectionName}, ${subCollectionName}`);
    let collectionUrl = `${baseUrl}/${collectionName}/`;
    let subCollectionUrl = `${baseUrl}/${collectionName}/${subCollectionName}/`;
    collectionUrl = collectionUrl.replace(/\/\//g, "/").replace(/\/\//g, "/");
    subCollectionUrl = subCollectionUrl
      .replace(/\/\//g, "/")
      .replace(/\/\//g, "/");
    let collectionItemAdded = false;
    for (
      let collectionIdx = 0;
      collectionIdx < collections.length;
      collectionIdx++
    ) {
      if (collections[collectionIdx].name === collectionName) {
        for (
          let subCollectionIdx = 0;
          subCollectionIdx < collections[collectionIdx].subCollection.length;
          subCollectionIdx++
        ) {
          if (
            collections[collectionIdx].subCollection[subCollectionIdx].name ===
            subCollectionName
          ) {
            collectionItemAdded = true;
            collections[collectionIdx].subCollection[
              subCollectionIdx
            ].items.push(mdxItem);
            break;
          }
        }
        if (collectionItemAdded === false) {
          collectionItemAdded = true;
          const subCollectionItem = {
            id: createNodeId(`${subCollectionName} >>> CollectionMdx`),
            name: subCollectionName,
            slug: subCollectionUrl,
            items: [mdxItem],
            subCollection: [],
          };
          collections[collectionIdx].subCollection.push(subCollectionItem);
        }
      }
    }
    if (collectionItemAdded === false) {
      collectionItemAdded = true;
      const collectionItem = {
        id: createNodeId(`${collectionName} >>> CollectionMdx`),
        name: collectionName,
        slug: collectionUrl,
        items: [],
        subCollection: [
          {
            id: createNodeId(`${subCollectionName} >>> CollectionMdx`),
            name: subCollectionName,
            slug: subCollectionUrl,
            items: [mdxItem],
          },
        ],
      };
      collections.push(collectionItem);
    }
  },
  updateCollectionNode: (collection) => {
    let updatedCollection = {
      ...collection,
    };
    for (
      let subCollectionIdx = 0;
      subCollectionIdx < collection.subCollection.length;
      subCollectionIdx++
    ) {
      const subCollection = updatedCollection.subCollection[subCollectionIdx];
      updatedCollection.subCollection[subCollectionIdx] = {
        ...subCollection,
        internal: {
          type: "CollectionMdx",
          contentDigest: crypto
            .createHash("md5")
            .update(JSON.stringify(subCollection))
            .digest("hex"),
          content: JSON.stringify(subCollection),
          description: "Collection",
        },
      };
    }
    updatedCollection = {
      ...updatedCollection,
      children: [],
      internal: {
        type: "CollectionMdx",
        contentDigest: crypto
          .createHash("md5")
          .update(JSON.stringify(updatedCollection))
          .digest("hex"),
        content: JSON.stringify(updatedCollection),
        description: "Collection",
      },
    };
    return updatedCollection;
  },
};
