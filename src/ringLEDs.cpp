#include <vector>

#include <FastLED.h>

#include "ringLEDs.h"

#define DATA_PIN 2

#define NUM_LEDS_OUTER 12
#define NUM_LEDS_INNER 8
#define NUM_LEDS_TOTAL (NUM_LEDS_OUTER + NUM_LEDS_INNER)

CRGB allLEDs[NUM_LEDS_TOTAL];

std::vector<RingLED> ringLEDs {
	{0, 0.917, outer}, {1, 0, outer}, {2, 0.083, outer}, {3, 0.167, outer}, {4, 0.25, outer}, {5, 0.333, outer}, {6, 0.417, outer}, {7, 0.5, outer}, {8, 0.583, outer}, {9, 0.667, outer}, {10, 0.75, outer}, {11, 0.833, outer},
	{12, 0.125, inner}, {13, 0.25, inner}, {14, 0.375, inner}, {15, 0.5, inner}, {16, 0.625, inner}, {17, 0.75, inner}, {18, 0.875, inner}, {19, 0, inner}
};

void initialiseLEDs(int brightness){
  LEDS.addLeds<WS2812, DATA_PIN, GRB>(allLEDs, ringLEDs.size());
	LEDS.setBrightness(brightness);
}
