#-*- coding: utf-8 -*-
import itertools
import random
from collections import namedtuple, Counter

LINES = [
    (  0,  3,  7),
    (  1,  4,  8, 12),
    (  2,  5,  9, 13, 16),
         ( 6, 10, 14, 17),
             (11, 15, 18),

        ( 0,  1,  2),
      ( 3,  4,  5,  6),
    ( 7,  8,  9, 10, 11),
      (12, 13, 14, 15),
        (16, 17, 18),

             ( 7, 12, 16),
         ( 3,  8, 13, 17),
    (  0,  4,  9, 14, 18),
    (  1,  5, 10, 15),
    (  2,  6, 11),
]

TILES = range(1, 20)

TOTAL = 38

def score_arrangement(arrangement):
    """
    Check all lines in an arrangement and return the sum of the differences
    between expected and actual sum of tiles for each line. E.g. for two
    lines, (12, 12, 12) and (10, 10, 10, 10, 10), with a TOTAL of 38:

        12 + 12 + 12 is 36 -> 38 - 36 = 2
        10 + 10 + 10 + 10 + 10 is 50 -> 50 - 38 = 12
        Score is 2 + 12 = 14

    The correct solution has a score of 0.
    """
    tally = 0

    for line in LINES:
        tally += abs(sum(arrangement[i] for i in line) - TOTAL)

    return tally


def mutate_arrangement(arrangement):
    i, j = random.sample(range(len(arrangement)), 2)
    result = list(arrangement)
    result[i], result[j] = result[j], result[i]
    return tuple(result)


def get_random_arrangement():
    arrangement = list(TILES)
    random.shuffle(arrangement)
    return tuple(arrangement)


def get_mutations(arrangement, count=100):
    return (mutate_arrangement(arrangement) for _ in range(count))


MutationResult = namedtuple('MutationResult', ['mutation', 'score'])


def main():
    current_score = len(LINES) * TOTAL
    base_arrangement = get_random_arrangement()
    history = Counter()

    while current_score > 0:
        mutations = itertools.chain(
            (base_arrangement,), get_mutations(base_arrangement)
        )

        mutation_results = sorted(
            (MutationResult(mutation, score_arrangement(mutation)) for mutation in mutations),
            reverse=True,
            key=lambda x: x.score
        )

        winner = mutation_results.pop()

        history[winner] += 1

        if history[winner] > 10:
            winner = mutation_results.pop()

        current_score = winner.score
        base_arrangement = winner.mutation
        print('Current best is {0} with {1}'.format(winner.mutation, winner.score))

    print('Solution is {0}'.format(base_arrangement))

if __name__ == '__main__':
    main()
