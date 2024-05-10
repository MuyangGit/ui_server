import Head from "./head/head.tsx"
import Middle from "./middle/middle.tsx"
import Bottom from "./bottom/bottom.tsx"
import Comment from "./comment/comment.tsx"

export default function Body() {
    return (
            <>
              <Head />
              <Middle />
              <Bottom />
              <Comment />
            </>
        )
    }