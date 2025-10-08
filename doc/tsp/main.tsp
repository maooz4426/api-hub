import "@typespec/http";

using Http;
@service(#{ title: "API-Hub" })
namespace APIHub;
model Artist {
  mbid: string;
  text: string;
}

model Image {
  smallImage: string;
  mediumImage: string;
  largeImage: string;
  extraLarge: string;
}

model Album {
  mbid: string;
  text: string;
}

model RecentTrack {
  mbid: string;
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
  getRecentTrack(@path userID: string): RecentTrack;
}

