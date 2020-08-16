import React, { useState} from "react";
import TitleWithTooltip from './TitleWithTooltip'
import Button from '@material-ui/core/Button';
import BlogLikeButtons from './BlogLikeButtons'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

const BlogGenerator: React.FC = () => {
	const [blogTitleText, setBlogTitleText] = useState("")
	const [exampleBlogTitleText, setExampleBlogTitleText] = useState("")
	const [exampleBlogText, setExampleBlogText] = useState("")
	const [generatedBlogText, setGeneratedBlogText] = useState("")
	const [isLoadingBlog, setIsLoadingBlog] = useState(false)
	

	const generateBlog = () => {
		setIsLoadingBlog(true)
		setTimeout(() => {
			setGeneratedBlogText(generatedBlogTextFinal)
			setIsLoadingBlog(false)
		}, 3000)
	}

	const getNumOfWords = () => {
		const len1 = exampleBlogTitleText.split(' ').length
		const len2 = blogTitleText.split(' ').length
		const len3 = exampleBlogText.split(' ').length
		return len1 + len2 + len3 -3
	}

  return (
		<div style={{padding: '0 5vw 0 5vw'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
					<TitleWithTooltip titleText='New Blog Title' tooltipText='Input the title for the blog post you want to create'/>
					<input 
						value={blogTitleText} 
						onChange={(e) => setBlogTitleText(e.target.value)}
					/>
					<TitleWithTooltip titleText='Blog Example' tooltipText='Input the title for the sample blog post'/>
          <div>Blog Example Title</div>
					<input 
						value={exampleBlogTitleText} 
						onChange={(e) => setExampleBlogTitleText(e.target.value)}
					/>
          <div>Blog Example Text</div>
					<div className='pro-tip' style={{background: "#9ED1A9", borderRadius: '3px', width: "35vw"}}>
						<b style={{fontWeight: 'bold', color: 'blue'}}>PRO TIP</b>
						: For best results, include raw text only. Clean up alt text from pasted images, those huge blocks of whitespace, and any weird residual text from links. Leave the title out.
					</div>
					<textarea 
						value={exampleBlogText} 
						onChange={(e) => setExampleBlogText(e.target.value)}
						style={{width: '40vw', height: '40vh'}}
					/>
        </div>
        <div>
					<TitleWithTooltip titleText='Blog Output' tooltipText='this is the generated text for the blog you are creating'/>
					<textarea 
						disabled
						value={generatedBlogText} 
						onChange={(e) => setGeneratedBlogText(e.target.value)} 
						style={{width: '45vw', height: '60vh'}}
					/>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <div>{getNumOfWords()}/900</div>
					<Button style={{minWidth: '120px', minHeight: "39px"}} onClick={generateBlog} disableElevation variant="contained" color="primary">
						{isLoadingBlog ? <CircularProgress color="white" size='26px'/> :"Generate"}
					</Button>
        </div>
				<BlogLikeButtons/>
      </div>
    </div>
  );
};

const generatedBlogTextFinal = `
The single best business advice I ever got was from my cofounder Ryan. It was a phrase he said to me frequently, “No one cares about your product.”

The first time he said it to me was when I was pitching another company’s VP of Marketing. I was explaining how we were going to use the product they were building to “revolutionize the industry.” It was going to be so amazing and I was so excited. I pitched a bunch more companies like this and he kept saying “No one cares about your product.”

After spending months in the company pitching to customers, I started to realize what he meant. The customers only cared about their problems. The product, for the most part, was invisible to them. I was so focused on the product I couldn’t see that.

The reality is most people in startups spend all their time on the product and very little time on the problem. It’s easy to do. You can iterate on the product until it’s amazing. You can optimize the product until it’s a diamond. But you don’t control the the problems. You can’t iterate on your customers’ problems. They are what they are.

There are only a small number of things you can control in your business. If you get good at focusing all of your energy on the things you can control, your startup can thrive.

I’ve written about this in more detail in my post on distractions, but the short version is:

1. Get good at asking the right questions

2. Listen for the answer

3. Take action on it

These three things, and not your product, are your three most important assets as a founder.

Ask better questions

The questions you ask your customers are more important than the answers you get. If you frame the question wrong, you’ll never get an answer. A bad question leads to no answer, no answer leads to no action, no action leads to no idea. It’s easy to get in a room and say “I’m going to ask customers what they want” and come back with a mountain of data. But 90% of that data is useless. The people you talk with are not representative of your perfect customer. The data you look at has nothing to do with the problem you’re solving. If you ask the wrong questions, you’ll get the wrong answers.

In order to get to the right answer, you need to ask better questions. What’s a better question? The right question. Which is a function of what you know about the problem. You need to take a step back and understand the problem as deeply as possible. Write it down. How do you currently solve the problem? What’s not good about it? What hole is there in the market? What’s broken? Who else has solved this problem? What made them successful? What made them fail?

Having a well-defined problem is the key to getting to the right answer.

Listen for the answer

Most people ask questions and listen only for a confirmation. Customers have no idea how to build a product. They don’t know what’s possible. They don’t know what they want until you show it to them. You need to listen for the answer.

Too often entrepreneurs accept a “good enough” answer. A good enough answer is not the same as a right answer. When you get an answer, dig in deeper. Ask why. Ask what else. Ask how else. Dig for the reasons behind the answer. You may be surprised at what you find.

Take action on it

Once you have a customer, and they’ve answered the question, you need to take action. You need to start building. You need to show them what you’ve built. Get their feedback. Iterate. Repeat.

This process works for way more than just product development. You can use it for marketing, fundraising, customer acquisition and retention, partnerships, etc. The questions change, and so do the answers, but the process is the same.

I still remember the moment I “got” the idea for what eventually became Sidekiq. I was doing my weekly call with Ryan. We were talking about Sidekiq and I said, “I don’t know if this is the right idea. I’m just trying to see if it’s possible.” He paused and said “You know what, even wrong ideas need to be acted on.” The idea I had in my head was totally wrong, but I was able to take the next step by listening for the answer and taking action on it.

`

export default BlogGenerator;