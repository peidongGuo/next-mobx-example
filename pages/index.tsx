import React from "react";
import "../styles.scss";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { action } from "mobx";
import { inject, observer } from "mobx-react";

interface ShowItemInfo {
  id: number;
  name: string;
}
interface ShowItem {
  score: number;
  show: ShowItemInfo;
}
interface Props {
  shows?: ShowItem[];
  store?: any;
}
@inject("store")
@observer
class Index extends React.Component<Props> {
  static async getInitialProps() {
    const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    return {
      shows: data
    };
  }

  @action.bound
  handleChgTitle() {
    this.props.store.pageTitle = "Batman TV Shows";
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Batman TV Shows</h1>
        <ul>
          {this.props.shows.map(({ show }) => (
            <li key={show.id}>
              <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                <a>{show.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <span onClick={this.handleChgTitle}>
          {this.props.store.pageTitle} 换名字
        </span>
      </div>
    );
  }
}

export default Index;
