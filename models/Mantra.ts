export class MantraModel {
  id: string;
  mantra_name: string;
  mantra_owner: string;
  audio_ref: string;
  backdrop_ref: string;
  thumbnail_ref: string;
  lyrics: string;

  constructor(
    id: string,
    mantra_name: string,
    mantra_owner: string,
    audio_ref: string,
    backdrop_ref: string,
    thumbnail_ref: string,
    lyrics: string
  ) {
    this.id = id;
    this.mantra_name = mantra_name;
    this.mantra_owner = mantra_owner;
    this.audio_ref = audio_ref;
    this.backdrop_ref = backdrop_ref;
    this.thumbnail_ref = thumbnail_ref;
    this.lyrics = lyrics;
  }
}
