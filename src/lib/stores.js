import {
	writable
} from 'svelte/store';

export const charSelected = writable('');
/// choices
export const displayChoices = writable(false);
export const displayCharacterChoices = writable(false);
export const displayWeaponChoices = writable(false);
export const displayItemChoices = writable(false);
export const displayStampChoices = writable(false);
export const displayStatChoices = writable(false);
export const displayFoodChoices = writable(false);
// add symbols
export const weaponAddSymbols = writable(Array(5).fill('add'));
export const itemAddSymbols = writable(Array(6).fill('add'));
export const stampAddSymbols = writable(Array(3).fill('add'));
// active gear
export const equippedWeapons = writable(Array(5).fill(''));
export const equippedItems = writable(Array(6).fill(''));
export const equippedStamps = writable(Array(3).fill(''));
export const equippedPrism = writable('');
export const equippedSupportItem = writable('');
export const equippedFoodDish = writable('');
// remove gear
export const removeWeapon = writable(false);
export const removeItem = writable(false);
export const removeStamp = writable(false);
export const removeSuperIndex = writable(-1);
export const removeInvalidItem = writable(-1);
export const addWeapon = writable(false);
// display toggle
export const showBuildName = writable(false);
export const showStamps = writable(true);
// reset slots
export const resetWeaponSlots = writable(false);
export const resetItemSlots = writable(false);
export const resetStampSlots = writable(false);
// misc
export const buildName = writable('Build Name');
export const collabLimit = writable(4);
export const superCollabLimit = writable(1);
export const weaponSlots = writable(6);
export const itemSlots = writable(6);
export const clickedSlotIndex = writable(-1);
export const statPriorityOrder = writable([]);
export const showPriorityOrder = writable(false);
export const banWeapon = writable(false);