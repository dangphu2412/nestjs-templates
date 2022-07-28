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
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faHome, faCake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SideBar.module.scss';

type MenuItem = {
  id: string;
  name: string;
  accessLink: string;
  icon?: IconDefinition;
  subMenus?: MenuItem[];
};

export function SideBar(): React.ReactElement {
  const menuItems: MenuItem[] = [
    {
      id: 'user-management',
      name: 'User management',
      accessLink: '/users',
      icon: faHome,
      subMenus: [
        {
          id: 'user-management/administrators',
          name: 'Administrators',
          accessLink: '/users/admin'
        },
        {
          id: 'user-management/accessibilities',
          name: 'Accessibilities',
          accessLink: '/users/accessibilities'
        }
      ]
    },
    {
      id: 'category',
      name: 'Category',
      accessLink: '/category',
      icon: faCake
    }
  ];

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
          {menuItems.map(item => {
            return (
              <AccordionItem borderY="none" key={item.id}>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      paddingY="0.675rem"
                      paddingX="1rem"
                      marginBottom="0.375rem"
                      className={`${isExpanded && styles['active-menu']}`}
                    >
                      {!!item?.icon && (
                        <FontAwesomeIcon width={24} icon={item.icon} />
                      )}
                      <Text
                        m={0}
                        fontWeight={isExpanded ? 'semi-bold' : 'medium'}
                        align="center"
                        paddingLeft={!item.icon ? 7 : 1}
                      >
                        {item.name}
                      </Text>
                    </AccordionButton>

                    {!!item.subMenus && (
                      <AccordionPanel p={0}>
                        <List>
                          {item.subMenus.map(subMenuItem => {
                            return (
                              <ListItem
                                key={subMenuItem.id}
                                paddingY="0.675rem"
                                paddingX="1rem"
                                fontWeight="light"
                                cursor="pointer"
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
