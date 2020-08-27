import React, { useState } from "react";
import TitleWithTooltip from "./TitleWithTooltip";
import Button from "@material-ui/core/Button";
import BlogLikeButtons from "./BlogLikeButtons";
import CircularProgress from "@material-ui/core/CircularProgress";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import { useQuery } from "urql";

const UserQuery = gql`
  query($token: String!) {
    user(token: $token) {
      id
      first_name
    }
  }
`;

type UserQueryData = {
  user: {
    id: string;
    first_name: string;
  };
};

const BlogGenerator: React.FC = () => {
  if (typeof window !== "undefined") {
    const router = useRouter();
    const [userQueryResult] = useQuery({
      query: UserQuery,
      variables: { token: "localStorage.getItem('token')" },
    });
    if (userQueryResult.error !== undefined) {
      router.push("/login");
    }
  }

  const [blogTitleText, setBlogTitleText] = useState("");
  const [exampleBlogTitleText, setExampleBlogTitleText] = useState("");
  const [exampleBlogText, setExampleBlogText] = useState("");
  const [generatedBlogText, setGeneratedBlogText] = useState("");
  const [isLoadingBlog, setIsLoadingBlog] = useState(false);

  const generateBlog = async () => {
    setIsLoadingBlog(true);

    // fetch result
    const res = await fetch("http://localhost:3000/api/openai", {
      method: "POST",
      body: JSON.stringify({ prompt: exampleBlogText }),
    });
    const data = await res.json();
    console.log("data", data);
    setTimeout(() => {
      setGeneratedBlogText(data.choices[0].text);
      setIsLoadingBlog(false);
    }, 500);
  };

  const getNumOfWords = () => {
    const len1 = exampleBlogTitleText.split(" ").length;
    const len2 = blogTitleText.split(" ").length;
    const len3 = exampleBlogText.split(" ").length;
    return len1 + len2 + len3 - 3;
  };

  return (
    <div style={{ padding: "0 5vw 0 5vw" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <TitleWithTooltip
            titleText="Input Text ('Three red buttons')"
            tooltipText="Input the title for the sample blog post"
          />

          <div
            className="pro-tip"
            style={{
              background: "#9ED1A9",
              borderRadius: "3px",
              width: "35vw",
            }}
          >
            <b style={{ fontWeight: "bold", color: "blue" }}>PRO TIP</b>: For
            best results, include raw text only. Clean up alt text from pasted
            images, those huge blocks of whitespace, and any weird residual text
            from links. Leave the title out.
          </div>
          <textarea
            value={exampleBlogText}
            onChange={(e) => setExampleBlogText(e.target.value)}
            style={{ width: "40vw", height: "40vh" }}
          />
        </div>
        <div>
          <TitleWithTooltip
            titleText="Blog Output"
            tooltipText="this is the generated text for the blog you are creating"
          />
          <textarea
            disabled
            value={generatedBlogText}
            onChange={(e) => setGeneratedBlogText(e.target.value)}
            style={{ width: "45vw", height: "60vh" }}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div>{getNumOfWords()}/900</div>
          <Button
            style={{ minWidth: "120px", minHeight: "39px" }}
            onClick={generateBlog}
            disableElevation
            variant="contained"
            color="primary"
          >
            {isLoadingBlog ? (
              <CircularProgress color="inherit" size="26px" />
            ) : (
              "Generate"
            )}
          </Button>
        </div>
        <BlogLikeButtons />
      </div>
    </div>
  );
};

export default BlogGenerator;
