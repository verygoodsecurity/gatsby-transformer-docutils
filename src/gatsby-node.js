const docutils = require(`./docutils-parser`);
const _ = require(`lodash`);

async function onCreateNode({
                                node,
                                actions,
                                loadNodeContent,
                                createNodeId,
                                createContentDigest,
                            }) {
    const {createNode, createParentChildLink} = actions;

    function transformObject(obj, id, type) {
        const jsonNode = {
            ...obj,
            id,
            children: [],
            parent: node.id,
            internal: {
                contentDigest: createContentDigest(obj),
                type,
            },
        }
        createNode(jsonNode)
        createParentChildLink({parent: node, child: jsonNode})
    }

    // We only care about XML content.
    if (![`application/xml`, `text/xml`].includes(node.internal.mediaType)) {
        return
    }
    const rawXml = await loadNodeContent(node);
    const document = docutils.parse(rawXml);
    if (document.children) {
        document.xmlChildren = document.children;
        delete document.children
    }
    const docUtilNode = {
        ...document,
        id: createNodeId(`${node.id} >>> docutils`),

        children: [],
        parent: node.id,
        internal: {
            contentDigest: createContentDigest(document),
            type: _.upperFirst(`docutils`),
        },
    };
    createNode(docUtilNode);
    createParentChildLink({parent: node, child: docUtilNode});

    return
}


exports.onCreateNode = onCreateNode;
