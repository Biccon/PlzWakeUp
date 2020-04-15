import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ProgressBar from "react-bootstrap/ProgressBar";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import './YoutubeDownloader.scss'

class YoutubeDownloader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaylist: false, // Video or Playlist
      url: "",
      pending: []
    };
  }

  onDownloadClicked = e => {
    e.preventDefault();
    alert(this.state.url);
  };

  render() {
    const { isPlaylist, url } = this.state;
    const videoURL = "https://www.youtube.com/watch?v=";
    const playlistURL = "https://www.youtube.com/playlist?list=";

    return (
      <Container>
        <Row>
          <Col md="7">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <Form.Check
                    type="switch"
                    id="is-playlist"
                    label={isPlaylist ? "Playlist" : "Video"}
                    checked={isPlaylist}
                    onChange={e =>
                      this.setState({ isPlaylist: e.target.checked })
                    }
                  />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="youtube-url"
                placeholder={isPlaylist ? playlistURL : videoURL}
                onChange={e => this.setState({ url: e.target.value })}
                value={url}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-primary"
                  onClick={this.onDownloadClicked}
                >
                  Preview
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col>
            <div className="downloading">
              <div className="downloading-caption">다운로드 중</div>
              <ProgressBar animated variant="primary" now={5} />
            </div>
            <ListGroup className="pending">
              <ListGroup.Item variant="primary" className="pending-item">
                <div className="thumbnail">thumbnail</div>
                <div className="link">링크</div>
                <div className="title">노래제목</div>
                <div className="state">진행중</div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default YoutubeDownloader;
