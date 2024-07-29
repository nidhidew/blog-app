import articles from "./article-content";
import ArticlesList from '../components/ArticlesList';

const ArticlesPage = () =>{
    return (
        <>
        <ArticlesList articles = {articles} />
        </>
    );
}

export default ArticlesPage