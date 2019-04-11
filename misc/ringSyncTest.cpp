#include <Arduino.h>
#include <FastLED.h>
#include <cmath>
#include <vector>
#include <algorithm>

// How many leds in your strip?
#define NUM_LEDS_OUTER 12
#define NUM_LEDS_INNER 8
#define NUM_LEDS_TOTAL (NUM_LEDS_OUTER + NUM_LEDS_INNER)

#define DATA_PIN 2

// Define the array of leds
// CRGB leds_outer[NUM_LEDS_OUTER];
// CRGB leds_inner[NUM_LEDS_INNER];
CRGB leds_total[NUM_LEDS_TOTAL];

struct RingLED {
    int index;
    float angle;
};

std::vector<RingLED> ringLEDs{
	{0, 0.917}, {1, 0}, {2, 0.083}, {3, 0.167}, {4, 0.25}, {5, 0.333}, {6, 0.417}, {7, 0.5}, {8, 0.583}, {9, 0.667}, {10, 0.75}, {11, 0.833},
	{12, 0.125}, {13, 0.25}, {14, 0.375}, {15, 0.5}, {16, 0.625}, {17, 0.75}, {18, 0.875}, {19, 0}
};

std::vector<RingLED> sortedLEDs(ringLEDs.size());

bool sortByAngle(const RingLED& a, const RingLED& b)
{
  // smallest comes first
  return a.angle < b.angle;
}

// float outerLEDs [NUM_LEDS_OUTER] = {0.00, 0.083, 0.166, 0.25, 0.333, 0.4166, 0.5,  0.5833, 0.666, 0.75, 0.8333, 0.9166, 0.00, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875};

void setup() {
	Serial.begin(9600);
	Serial.println("resetting");

  sortedLEDs = ringLEDs;
  std::sort(sortedLEDs.begin(), sortedLEDs.end(), sortByAngle);

	LEDS.addLeds<WS2812, DATA_PIN, GRB>(leds_total, NUM_LEDS_TOTAL);
	LEDS.setBrightness(128);
}

void loop() {
	static int position = 0;
  float currentAngle = sortedLEDs[position].angle;
  for (auto &i : sortedLEDs) {
    if(i.angle == currentAngle) {
      leds_total[i.index] = CHSV(0, 255, 255);
      // Serial.println(i.angle);
      // Serial.println(i.index);
    }
    else leds_total[i.index] = CHSV(0, 0, 0);
}
	position = (position + 1) % ringLEDs.size();
	FastLED.show();
	FastLED.delay(1000 / 2);
	// static int led = 0;
	// for(int i = 0; i < NUM_LEDS_TOTAL; i++) {
	// 	if(i == led) leds_total[i] = CHSV(angle[i] * 255, 255, 255);
	// 	else leds_total[i] = CHSV(0, 0, 0);
	// }
	// led = (led + 1) % NUM_LEDS_TOTAL;
	// FastLED.show();
	// FastLED.delay(1000);

}
