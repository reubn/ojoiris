#include <functional>

extern void initialiseWifi(ConfigurableSettings& settings, std::function<void()>& saveConfig);
extern void loopWifi();
