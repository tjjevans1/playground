import "waypoints/lib/jquery.waypoints.min.js";

const player = () => {
  const selector = {
    player: "data-pg-player",
    video: "data-pg-player-video"
  };

  const $selections = {
    players: $(`[${selector.player}]`)
  };

  const classes = {
    fixed: "is-fixed",
    finished: "is-finished"
  };

  const waypoints = [];

  const updateVideo = ($player, $video, rate) => {
    const distance = -$player[0].getBoundingClientRect().y;
    let time = 0;

    if (distance > 0) {
      time = distance * rate;
    }

    $video[0].currentTime = time;
  };

  const getHandleScroll = ($player, $video) => {
    // rate in seconds per pixel scrolled
    let rate = $video[0].duration / $player.outerHeight();

    const handleScroll = e => {
      window.requestAnimationFrame(() => {
        updateVideo($player, $video, rate);
      });
    };

    return handleScroll;
  };

  const getOffset = bottom => (bottom ? "bottom-in-view" : 0);

  const unfixPlayer = ($video, handleScroll, direction) => {
    if (direction === "down") {
      $video.addClass(classes.finished);
    }

    $video.removeClass(classes.fixed);

    $(window).off("scroll", handleScroll);
  };

  const fixPlayer = ($video, handleScroll, direction) => {
    $video.removeClass(classes.finished);
    $video.addClass(classes.fixed);

    $(window).on("scroll", handleScroll);
  };

  const bindToPlayer = element => {
    const $player = $(element);
    const $video = $player.find(`[${selector.video}]`);

    $video.on("loadedmetadata", e => {
      const handleScroll = getHandleScroll($player, $video);

      [false, true].forEach(bottom => {
        waypoints.push(
          $player.waypoint({
            handler: function(direction) {
              if (direction == "down") {
                if (!bottom) {
                  fixPlayer($video, handleScroll, direction);
                } else {
                  unfixPlayer($video, handleScroll, direction);
                }
              } else {
                if (!bottom) {
                  unfixPlayer($video, handleScroll, direction);
                } else {
                  fixPlayer($video, handleScroll, direction);
                }
              }
            },
            offset: getOffset(bottom)
          })
        );
      });
    });
  };

  $selections.players.once("player").each((index, element) => {
    bindToPlayer(element);
  });
};

export default player;
