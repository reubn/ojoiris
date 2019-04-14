#include <map>
#include <string>

extern void initialiseCoordinator(ConfigurableSettings& settings);
extern void loopCoordinator(ConfigurableSettings& settings);
extern std::map<std::string, void (*)(ConfigurableSettings& settings)> shows;
