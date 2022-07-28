import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
  ListItem,
  Text
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import styles from './SideBar.module.scss';
import { SidebarMenuItem } from '../../clients/sidebar-menu.types';
import { useQueryMenu } from '../../hooks/useQueryMenu.hook';
import { convertToSidebarMenu } from '../../converters/convertToSidebarMenu';

export function SideBar(): React.ReactElement {
  const router = useRouter();

  const { data: menu } = useQueryMenu();
  const sidebarMenuItems = React.useMemo(
    () => convertToSidebarMenu(menu),
    [menu]
  );

  const handleNavigate = React.useCallback(
    (item: SidebarMenuItem) => {
      if (item.accessLink && !item.subMenus) {
        router.push(item.accessLink);
      }
    },
    [router]
  );

  return (
    <aside className="my-4 ml-4">
      <Box marginX="2rem" marginY="1.5rem">
        <Text align="left" fontSize="lg">
          Admin Dashboard
        </Text>
      </Box>

      <hr className="mb-4" />

      <Box display={{ base: 'none', md: 'block' }}>
        <Accordion allowToggle>
          {sidebarMenuItems?.map(item => {
            return (
              <AccordionItem borderY="none" key={item.id}>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      paddingY="0.675rem"
                      paddingX="1rem"
                      marginBottom="0.375rem"
                      className={`${isExpanded && styles['active-menu']}`}
                      onClick={() => handleNavigate(item)}
                    >
                      {!!item?.icon && (
                        <Box
                          backgroundColor="white"
                          borderRadius="md"
                          p="1"
                          height="8"
                          width="8"
                          boxShadow="0 .3125rem .625rem 0 rgba(0,0,0,.12)"
                          marginRight="1"
                          className={`${isExpanded && styles['active-icon']}`}
                        >
                          <FontAwesomeIcon
                            width={12}
                            height={12}
                            icon={item.icon}
                            color={isExpanded ? 'white' : 'black'}
                          />
                        </Box>
                      )}
                      <Text
                        m={0}
                        fontWeight={isExpanded ? 'semi-bold' : 'normal'}
                        align="center"
                        paddingLeft={2}
                      >
                        {item.name}
                      </Text>
                    </AccordionButton>

                    {!!item.subMenus && item.subMenus.length > 0 && (
                      <AccordionPanel p={0}>
                        <List>
                          {item.subMenus.map(subMenuItem => {
                            return (
                              <ListItem
                                key={subMenuItem.id}
                                paddingY="0.675rem"
                                paddingLeft={4}
                                fontWeight="light"
                                cursor="pointer"
                                onClick={() => handleNavigate(subMenuItem)}
                              >
                                {subMenuItem.name}
                              </ListItem>
                            );
                          })}
                        </List>
                      </AccordionPanel>
                    )}
                  </>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
    </aside>
  );
}
