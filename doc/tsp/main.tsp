import "@typespec/http";

using Http;
@service(#{ title: "API-Hub" })
namespace APIHub;

@doc("アーティスト情報")
model Artist {
  @doc("識別子")
  mbid: string;

  @doc("アーティスト名")
  text: string;
}

@doc("アートワークの各サイズを作成")
model Image {
  smallImage: string;
  mediumImage: string;
  largeImage: string;
  extraLarge: string;
}

@doc("アルバム情報")
model Album {
  @doc("識別子")
  mbid: string;

  @doc("アルバム名")
  text: string;
}

@doc("最近の聞いた曲の情報")
model RecentTrack {
  @doc("識別子")
  mbid: string;

  @doc("曲名")
  name: string;

  artist: Artist;
  image: Image;
  album: Album;
}

@error
model Error {
  code: int32;
  message: string;
}

@route("/music")
@tag("Music")
interface Music {
  @summary("最近聞いた曲を取得")
  @doc("Last.fmのAPIを通して最近の曲を取得しています。")
  @get
  getRecentTrack(
    @doc("lastfmで登録しているuserID") @query userID: string,
  ): RecentTrack;
}

model svgImage {
  @header contentType: "image/svg+xml";
  @body image: string;
}

@route("/music/svg")
@tag("Music")
interface MusicSVG {
  @summary("最近聞いた曲のSVGを取得")
  @doc("lastfmで取得した情報からSVGを生成")
  @get
  getRecentTrackSVG(
    @doc("svg情報")
    @query
    userID: string,

    preview: boolean,
  ): svgImage;
}

