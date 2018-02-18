#!/bin/bash
package=$1
component=$2

function packageInput() {
  echo "What is the Package name?"
  read package
  package=$(tr '[:upper:]' '[:lower:]' <<< $package)
  package="${package// /-}"
  package="${package//_/-}"
  echo "Package name is: $package"
}

function componentInput() {
  echo "What is the Component name?"
  read component
  component=$(tr '[:lower:]' '[:upper:]' <<< ${component:0:1})${component:1}
  echo "Component name is: $component"
}

if [[ "$package" = "" ]]; then
  packageInput
  echo
fi

if [[ "$component" = "" ]]; then
  componentInput
  echo
fi

cp -rv "./template" "./packages/$package"

sleep 1

sed -i -e "s/COMPONENT_NAME/$component/g" "./packages/$package/index.js"
sed -i -e "s/COMPONENT_NAME/$component/g" "./packages/$package/index.stories.js"
sed -i -e "s/COMPONENT_NAME/$component/g" "./packages/$package/index.test.js"
sed -i -e "s/PACKAGE_NAME/$package/g" "./packages/$package/package.json"

echo "Success!"
echo "Package $package created!"

sleep 2
