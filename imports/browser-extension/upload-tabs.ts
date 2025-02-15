import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { PACKAGE_NAME } from "./package-name";


export default async function uploadTabs(deep: DeepClient, deviceLinkId, tabs) {
  const containTypeLinkId = await deep.id("@deep-foundation/core", "Contain");
  const browserExtensionLinkId = await deep.id(deviceLinkId, "BrowserExtension");
  const tabTypeLinkId = await deep.id(PACKAGE_NAME, "Tab");
  const urlTypeLinkId = await deep.id(PACKAGE_NAME, "TabUrl");
  const titleTypeLinkId = await deep.id(PACKAGE_NAME, "TabTitle");
  const activeTypeLinkId = await deep.id(PACKAGE_NAME, "Active");

  await deep.insert(tabs.map((tab) => ({
    type_id: tabTypeLinkId,
    number: { data: { value: tab.id } },
    in: {
      data: [{
        type_id: containTypeLinkId,
        from_id: browserExtensionLinkId,
      }]
    },
    out: {
      data: [
        {
          type_id: containTypeLinkId,
          to: {
            data: {
              type_id: urlTypeLinkId,
              string: { data: { value: tab.url } },
            }
          }
        },
        {
          type_id: containTypeLinkId,
          to: {
            data: {
              type_id: titleTypeLinkId,
              string: { data: { value: tab.title } },
            }
          }
        },
        {
          type_id: containTypeLinkId,
          to: {
            data: {
              type_id: activeTypeLinkId,
              string: { data: { value: tab.active ? "true" : "false" } },
            }
          }
        }]
    }
  })))
}