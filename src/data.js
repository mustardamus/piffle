module.exports = {
  audioContext : null, // initialized audio context by mic-access
  audioStream  : null, // initialized audio stream
  volume       : 0,    // updated by volume-meter
  silencePeriod: 1000  // how much silence allowed before game over, checked by silence-meter
};
