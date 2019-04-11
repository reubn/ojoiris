enum Ring {inner, outer};

struct RingLED {
    int index;
    float angle;
    Ring ring;
};

extern CRGB allLEDs[];
extern std::vector<RingLED> ringLEDs;
extern void initialiseLEDs(int brightness);
