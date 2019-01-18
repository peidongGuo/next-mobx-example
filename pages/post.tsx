import React from "react";
import "../styles.scss";
import fetch from "isomorphic-unfetch";
import { action } from "mobx";
import { inject, observer } from "mobx-react";

interface Props {
  show: ShowItemInfo;
  store?: any;
}
interface ShowItemInfo {
  id: number;
  name: string;
  image: any;
  summary: string;
}
@inject("store")
@observer
class Post extends React.Component<Props> {
  static async getInitialProps(context) {
    const { id } = context.query;
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await res.json();

    console.log(`Fetched show: ${show.name}`);

    return { show };
  }
  @action.bound
  handleChgTitle() {
    this.props.store.pageTitle = this.props.show.name;
  }
  render() {
    return (
      <div>
        <h1>{this.props.show.name}</h1>
        <p>{this.props.show.summary.replace(/<[/]?p>/g, "")}</p>
        <img src={this.props.show.image.medium} />
        <span onClick={this.handleChgTitle}>
          {this.props.store.pageTitle} 换名字
        </span>
      </div>
    );
  }
}
export default Post;
