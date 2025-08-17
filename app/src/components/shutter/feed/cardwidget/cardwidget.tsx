import { Article } from "../feed.types";
import CardWidgetContainer from "./cardWidget.styles";

const CardWidget = (article: Article) => {
  return (
    <CardWidgetContainer className="col-row">
      <div className="card-left col-md-6">
        <img src={article.urlToImage} alt={article.title} />
      </div>
      <div className="card-right col-md-6">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
      </div>
    </CardWidgetContainer>
  );
};

export default CardWidget;
