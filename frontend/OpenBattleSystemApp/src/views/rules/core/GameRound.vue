<script setup>
import NavBar from '@/components/NavBar.vue';
</script>


<template>

<div>
    <NavBar>
        <template #left>
            <router-link to="/rules/core/contents" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">&lt; Back</span>
            </router-link>
        </template>
    </NavBar>
    <div class="container-md mt-5">
<section>
    <div class="row">
        <div class="col">
            <h1>Game round</h1>
            <p>A game round shall consist of each player taking a turn of play. A begins when the first player begins their turn and ends when the last player has completed their turn.</p>
            <h2>Player Turns</h2>
                <p>A turn begins when the first player begins the turn phase. Once their turn is completed, the next player begins their turn. Play continues until all players have completed their turn.</p>
                <h3>Turn Phases</h3>
                    <p>Each player completes the following set of phases, in the following order, which will comprise 1 turn:</p>
                    <ol>
                        <li>Morale Check Phase</li>
                        <li>Movement Phase</li>
                        <li>Combat Phase
                            <ul>
                                <li>Ranged Combat</li>
                                <li>Close Combat</li>
                            </ul>
                        </li>
                    </ol>
                    <ul>
                        <li>If 1 or more squads have a status other than "Normal” then they shall participate in the “Morale Check Phase”</li>
                        <li>If 1 or more squads have the ability to perform a movement, then the squad may make an action in the “Movement Phase"</li>
                        <li>If 1 or more squads have the ability to perform a Combat Attack, then they shall participate in the “Combat Phase" with the additional restrictions:
                            <ul>
                                <li>Ranged Combat, if the squad has a value for Ranged Combat then they may make a Ranged Attack.</li>
                                <li>Close Combat, if the squad has a value for Close Combat then they may make a Close Combat Attack.</li>
                            </ul>
                        </li>
                    </ul>
                    <p>A squad that does not have a combat value for Ranged Combat may still be attacked by an enemy squad in the Ranged Combat phase of an opponents turn.</p>
                    <p>A squad that does not have a combat value for Close Combat may still be attacked by an enemy squad in the Close Combat phase of an opponents turn.</p>
            <h2>Morale Check Phase</h2>
                <p>Morale checks are required for a squad for any of the following reasons:</p>
                <ul>
                    <li>Squad Cohesion is broken.</li>
                    <li>Squad Status is Fallback
                    </li>
                </ul>
                <p>If any of the current players units are in the status of fallback, they may opt to take a Morale Check at this time to regroup.</p>
                <ul>
                    <li>Success: If the unit passes their morale check, squad status will be changed to normal the squad may continue on with the rest of the turn. </li>
                    <li>Failure: If the unit has failed their morale check, then the squad status will remain the same and will act according to the rules of the squad status.
                    </li>
                </ul>
            <h2>Movement Phase</h2>
                <p>Each unit on the board makes a standard movement, plus or minus any modifiers.</p>
            <h2>Combat Phase</h2>
                <h3>Combat Sequence</h3>
                    <h4>Summary</h4>
                        <p>Regardless of which combat method is chosen, the sequence is the same. Roll the number of “to hit” dice equal to the weapon attack profile against the attacker’s appropriate combat profile, plus or minus any modifiers. The successful rolls become the attacker’s “to wound” pool which is which is rolled against the defender’s toughness profile, plus or minus any modifiers from the weapons strength profile or special abilities. Lastly, the attacker’s successful  “to wound” rolls becomes the defender’s “to save” pool. The defender rolls the pool against the defending unit’s Armor Save profile, plus or minus any modifiers from the attacker’s weapon’s Armor Penetration profile and/or special rules. Any failed rolls by the defender results in that unit taking a wound for each failed “to save” roll.</p>
                    <h4>To Hit Rolls</h4>
                        <p>Attacking unit selects a defending unit. Attacker rolls the number of D6 equal to the number of Attacks (A) in the weapon profile against the unit's combat attribute, ranged combat (RC) for shooting and close combat (CC) for melee. The unit must meet or beat the combat score (plus or minus any modifiers) with each D6.</p>
                    <h4>To Wound Rollss</h4>
                        <p>All successful "to hit" rolls become the pool for "to wound" rolls. To Wound rolls are based on the attacker rolling against the defenders Physical Toughness (PT) applying any modifiers from the weapon’s strength and special abilities, if any.</p>
                    <h4>To Save Rolls</h4>
                        <p>All successful "to wound" rolls becomes the defenders pool for "Combat Save" rolls. The defender rolls the dice in the pool against their Combat Save (AS) value, applying any modifiers from the weapon’s Save Modifier (SM) and special abilities, if any.</p>
                <h3>Ranged Combat</h3>
                    <h4>Line of Sight</h4>
                        <p>Attacking squads must have a clear unobstructed line of sight to the defending squad. Friendly squads do not block line of sight. Opposing squads will block line of sight.</p>
                    <h4>Select attacking squad</h4>
                        <p>Attacker selects a squad to perform ranged combat. </p>
                    <h4>Select defending squad</h4>
                        <p>Once the attacking squad has been selected, a defending squad is selected.</p>
                    <h4>Measuring distances and targets within defending squad</h4>
                        <p>The at least 1 unit from the defending squad must be within the length of one attacking squad’s unit’s weapon’s distance to perform ranged combat. The only units that are eligible for attacking and defending are those units that are within the distance of the attacker’s weapon.</p>
                    <h4>Resolve combat sequence</h4>
                        <ul>
                            <li>Attacker makes “to hit” rolls</li>
                            <li>Attacker makes “to wound” rolls</li>
                            <li>Defender makes “to save” rolls</li>
                        </ul>
                    <h4>Defender checks morale</h4>
                        <p>If the defending squad lost 1 or more Hit Points, it may be required to take a morale check.</p>
                <h3>Close Combat</h3>
                    <h4>Declaring Close Combat Assault</h4>
                        <p>If the length between the attacking squad and the defending squad is less than or equal to the length of the attackers Assault Movement value, then the attacking squad may initiate close combat with an enemy squad, now the defending squad.</p>
                        <p>In order to successfully initiate close combat and create a combat scrum with the defending squad, at least 1 attacking squad model must touch at least 1 defending squad model.</p>
                        <p>So long as at least one attacker and one defender from each squad are touching, all squad models are considered to be in the combat scrum and engaged in close combat.</p>
                    <h4>Defender Counter Offensive</h4>
                        <p>Before attacking player moves the attacking squad into the defending squad, the defending squad is allowed to make a ranged combat attack with units in the squad that have a ranged combat score.</p>
                        <p>Any weapon with a distance value is eligible to be used, the defender does not need to check distance. If a weapon is used for ranged combat it may not also be used in Close Combat. Resolve a normal Ranged Combat Phase, if the attacking player ends this section with a status of fallback, the close combat is cancelled. Otherwise the attacker will continue the assault move.</p>
                    <h4>Assault Move</h4>
                        <p>Attacking player will now move the attacking squad towards the defending squad creating the combat scrum. Move each squad model up to the maximum assault distance attempting to touch 1 or more defender models.</p>
                    <h4>Determine order of play</h4>
                        <p>After the attacking unit is engaged with the defending unit, order of play is determined.</p>
                        <ol>
                            <li>Attackers that assaulted shall roll first.</li>
                            <li>If neither side assaulted this turn (ex. A second turn of close combat), then a roll off with 1D6 shall be performed with the highest roll winning. The winner shall now be known as the attacker.</li>
                        </ol>
                    <h4>Select Attackers and Defenders</h4>
                        <p>Once order of play has been established and each player knows when they are active, begin rolling for combat by selecting models within the combat scrum.</p>
                        <p>Combat actions may only be performed between units that are physically touching . If a unit is touching multiple enemy units, that unit  may allocate the total combat attacks between the multiple enemy units as the player  sees fit.</p>
                    <h4>Resolve Combat Sequence for Attacker</h4>
                        <ul>
                            <li>Attacker makes “to hit” rolls</li>
                            <li>Attacker makes “to wound” rolls</li>
                            <li>Defender makes “to save” rolls</li>
                        </ul>
                    <h4>Resolve Combat Sequence for Defender</h4>
                        <ul>
                            <li>Defender makes “to hit” rolls</li>
                            <li>Defender makes “to wound” rolls</li>
                            <li>Attacker makes “to save” rolls</li>
                        </ul>
                    <h4>Determine combat winner(s) and loser(s)</h4>
                        <p>Tally up which side took more Hit Point losses (not just model physical models), the side with fewer loses is declared the winner. If multiple different players are involved in the combat, the players are ranked terms</p>
                    <h4>Loser morale check or fallback</h4>
                        <p>Once a winner has been declared, the loser must choose to either perform a fallback move or take a morale check for the unit/squad to stay in combat. If the unit/squad fails the morale check, the unit/squad must perform a fallback move.</p>
                    <h4>Consolidate fighters or Fallback and Advance</h4>
                        <h5>Consolidate</h5>
                            <p>If the loser passes their morale check and opts to stay in combat, the units may now perform a consolidation move of 3” per unit. Consolidation happens with each player taking a turn to move a single unit with the winner going first. If no player was declared the winner and loser, have a die roll off to determine who makes the first move. Units may disengage with other units and move around to a more advantageous position.</p>
                        <h5>Fallback and Advance</h5>
                            <ul>
                                <li>Loser’s Fallback
                                    <ul>
                                        <li>If the loser failed the morale check or opted out of the morale check then the unit must make a fallback move.</li>
                                    </ul>
                                </li>
                                <li>Winner’s Advance
                                    <ul>
                                        <li>After the combat loser has performed the winner may now make an advance move.</li>
                                    </ul>
                                </li>
                            </ul>
                    <h4>Ranged Combat in Close Combat</h4>
                        <h5>Squads inside the Combat Scrum</h5>
                            <p>Squads in the combat scrum may not use Ranged Combat regardless whether the squad has units that are not touching enemy units.</p>
                        <h5>Squads outside the Combat Scrum</h5>
                            <p>Squads that are outside of a combat scrum may choose to use Ranged Combat on the combat scrum. To initiate Ranged Combat, attacking squad makes performs a standard Ranged Combat sequence stopping after the"to hit" roll has been made.</p>
                            <p>If the close combat scrum contains 1 or more friendly squads, the attacking player shall Roll all dice in the pool. On a roll of 4+ the hit is successfully applied to the enemy in the scrum and are placed in the enemy "to wound" pool. All failed rolls are placed in the friendly "to wound" pool. Otherwise, all successful "to hit" dice rolls will form the enemy hits pool.</p>
                            <p>Resolve each hit pool in the following manner:</p>
                            <ul>
                                <li>Using the pool of dice allocated for the enemy continue with the rest of the ranged combat sequence.
                                    <ul>
                                        <li>
                                            If there are 2 or more enemy squads in the combat scrum, the dice from the pool will be allocated as follows:
                                            <ol>
                                                <li>Select which squad will be the first squad, roll one die from the pool.</li>
                                                <li>On a roll of a 4+ the hit is assigned to that squad. Otherwise continue to next enemy squad until a 4+ is rolled, going back to the original squad and repeating as necessary.</li>
                                                <li>Repeat this process with the each enemy squad until all dice from pool are allocated to an enemy squad, going back to the original squad and repeating as necessary.</li>
                                                <li>Once all "to wound" dice from the pool have been allocated to enemy squads continue with the normal ranged combat sequence.</li>
                                            </ol>
                                        </li>
                                        <li>If the enemy squad is required to take a morale check it will do so and follow instructions for result.</li>
                                        <li>If a failed morale check causes the squad to change status and fallback out of combat and there are no other enemy squads in the combat scrum, close combat will end with friendly squad declared the winner.</li>
                                    </ul>
                                </li>
                            </ul>
                            <p>If a friendly squad losses 1 or more Hit Points as a result of Ranged Combat it will be required to take a morale check and follow instructions for result.</p>
                            <p>If the combat scrum is intact after the ranged combat then all Hit Points lost from Range Combat shall count towards determining which squad wins close combat.</p>
        </div>
    </div>
</section>
    </div>
</div>
</template>