struct ConfigurableSettings {
  float fps = 1000 / 60;

  int maxBrightness = 255;
  int minBrightness = 0;

  float maxHue = 255;
  float maxOffset = 255 / maxHue;

  int topHold = 2750;
  int bottomHold = 1750;
  int transitionLength = 3250;
  int dimmingLength = 1000;
  float colourOffsetIncrement = 0.004;

  bool enabled = true;

  int globalBrightness = 255;

  int showId = 0;

  int red = 255;
  int green = 0;
  int blue = 255;
};
