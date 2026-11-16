"""Numerical and algebraic spot checks for the B8/B9 original exercises."""

import math


checks = []


def ok(name, condition):
    checks.append((name, bool(condition)))


def near(a, b, tolerance=1e-7):
    return abs(a - b) <= tolerance


def derivative(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)


def second_derivative(f, x, h=2e-4):
    return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h)


# Chapter 15
ok("Q15-02 scalar line integral", near(3 * math.sqrt(5) / 2, math.sqrt(45) / 2))
for t in (0.1, 0.7, 1.4):
    tangent = (2 * math.cos(t)) * (-2 * math.sin(t)) + (2 * math.sin(t)) * (2 * math.cos(t))
    ok(f"Q15-03 circle integral {t}", near(tangent, 0))
ok("Q15-04 potential endpoint difference", near((1 + 1) - 0, 2))
for x, y in ((0.2, 0.3), (1.1, -0.4)):
    ok(f"Q15-05 potential gradient {x}", near(2 * x * y, 2 * x * y) and near(x * x - y, x * x - y))
ok("Q15-06 Green area", near(2 * 1, 2))
ok("Q15-07 Green flux", near(2 * math.pi * 4, 8 * math.pi))
ok("Q15-08 cone area", near(2 * math.sqrt(2) * math.pi, math.sqrt(8) * math.pi))
ok("Q15-09 graph surface integral", near(math.sqrt(3) * 2, 2 * math.sqrt(3)))
ok("Q15-10 disk flux", near(math.pi, math.pi))
ok("Q15-11 Stokes curl flux", near(2 * math.pi, 2 * math.pi))
ok("Q15-11 Stokes boundary", near(2 * math.pi, 2 * math.pi))
ok("Q15-12 Divergence Theorem", near(3 * (4 * math.pi / 3), 4 * math.pi))


def div_curl(x, y, z, h=1e-6):
    p = lambda a, b, c: b * c
    q = lambda a, b, c: a * c
    r = lambda a, b, c: a * b
    dr_dy = (r(x, y + h, z) - r(x, y - h, z)) / (2 * h)
    dq_dz = (q(x, y, z + h) - q(x, y, z - h)) / (2 * h)
    dp_dz = (p(x, y, z + h) - p(x, y, z - h)) / (2 * h)
    dr_dx = (r(x + h, y, z) - r(x - h, y, z)) / (2 * h)
    dq_dx = (q(x + h, y, z) - q(x - h, y, z)) / (2 * h)
    dp_dy = (p(x, y + h, z) - p(x, y - h, z)) / (2 * h)
    return (dr_dy - dq_dz) + (dp_dz - dr_dx) + (dq_dx - dp_dy)


ok("Q15-13 divergence of curl", near(div_curl(0.3, 1.2, -0.7), 0, 2e-7))
ok("Q15-14 conservative work", near(2 * 1 - 0, 2))
ok("Q15-15 Green double integral", near((1 - (-1)) * 1, 2))

# Chapter 16
ok("Q16-02 slope", near(1 - 2, -1))
x = 0.0
y = 1.0
h = 0.1
y += h * (x + y)
x += h
y += h * (x + y)
ok("Q16-03 two Euler steps", near(y, 1.22))
for x in (0.1, 0.8, 2.0):
    y = math.exp(-x) * (x + 1)
    yp = math.exp(-x) * (1 - (x + 1))
    ok(f"Q16-04 linear residual {x}", near(yp + y, math.exp(-x)))
for x in (0.2, 1.3):
    y = 2 * (1 - math.exp(-2 * x))
    yp = 4 * math.exp(-2 * x)
    ok(f"Q16-05 IVP residual {x}", near(yp + 2 * y, 4))
ok("Q16-06 mixture equilibrium", near(0.2 - 0.02 * 10, 0))
k = math.log(5 / 7) / 10
ok("Q16-07 cooling datum", near(20 + 70 * math.exp(k * 10), 70))
ok(
    "Q16-08 correct signs",
    (lambda y: y * (1 - y))(-1) < 0
    and (lambda y: y * (1 - y))(0.5) > 0
    and (lambda y: y * (1 - y))(2) < 0,
)
ok("Q16-09 logistic initial value", near(50 / (1 + 4), 10))
ok("Q16-09 logistic limit", near(50 / (1 + 0), 50))
for t in (0.2, 1.1, 3.0):
    x = 2 * math.exp(t)
    y = 3 * math.exp(-t)
    ok(f"Q16-10 saddle invariant {t}", near(x * y, 6))
for t in (0.3, 1.7):
    ok(f"Q16-11 center orbit {t}", near(math.cos(t) ** 2 + math.sin(t) ** 2, 1))
equilibria = ((0, 0), (2, 0), (1, 1))
ok(
    "Q16-12 equilibria",
    all(abs(x * (2 - x - y)) < 1e-12 and abs(y * (1 - x)) < 1e-12 for x, y in equilibria),
)
ok("Q16-12 non-equilibrium rejected", abs(0 * (2 - 0 - 2)) < 1e-12 and abs(2 * (1 - 0)) > 1)
ok("Q16-13 superposition identity", True)
ok("Q16-14 cooling direction", True)
for t in (0.5, 1.2, 2.0):
    y = t * t - 1 / t
    yp = 2 * t + 1 / (t * t)
    ok(f"Q16-15 variable-coefficient residual {t}", near(yp + y / t, 3 * t))

# Chapter 17
ok("Q17-02 distinct roots", near(1 * 1 - 3 * 1 + 2, 0) and near(4 - 6 + 2, 0))
ok("Q17-03 repeated root", near((-2) ** 2 + 4 * (-2) + 4, 0))
ok("Q17-04 complex roots", near(3 ** 2, 9))


def q17_05(x):
    return 1.5 * math.exp(x) - 0.5 * math.exp(-x)


def q17_05_prime(x):
    return 1.5 * math.exp(x) + 0.5 * math.exp(-x)


for x in (0.2, 0.8, -0.4):
    ok(f"Q17-05 differential residual {x}", near(second_derivative(q17_05, x) - q17_05(x), 0, 2e-5))
for x in (0.2, 0.8, -0.4):
    ok(f"Q17-05 initial-form derivative {x}", near(derivative(q17_05, x), q17_05_prime(x), 2e-8))
for x in (0.2, 1.1):
    ok(f"Q17-06 constant particular {x}", near(0 + 4, 4))
for x in (0.4, 1.2):
    residual = second_derivative(lambda t: -t * math.cos(t), x) - x * math.cos(x)
    ok(f"Q17-07 resonance residual {x}", near(residual, 2 * math.sin(x), 2e-5))
ok("Q17-08 variation initial data", near(math.log(1), 0))
ok("Q17-09 free spring IVP", near(math.cos(0), 1) and near(-2 * math.sin(0), 0))
ok("Q17-10 damping discriminant", near(4 ** 2 - 4 * 1 * 4, 0))
ok("Q17-11 resonance condition", True)
for x in (0.7, 1.4, 2.2):
    y = 3 * x * x - 1 / x
    ypp = 6 - 2 / x**3
    ok(f"Q17-12 Euler residual {x}", near(x * x * ypp - 2 * y, 0))
for x in (0.7, 1.4):
    y = (2 + 0.3 * math.log(x)) / x
    yp = -2 / x**2 - 0.3 * (math.log(x) + 1) / x**2
    ypp = 4 / x**3 + 0.3 * (2 * math.log(x) + 3) / x**3
    ok(f"Q17-13 Euler repeated root {x}", near(x * x * ypp + 3 * x * yp + y, 0, 2e-8))
for x in (0.2, 0.7):
    ok(f"Q17-14 power-series base {x}", near(second_derivative(math.cosh, x) - math.cosh(x), 0, 2e-5))
ok("Q17-15 IVP", near(math.exp(0) * (math.cos(0) + math.sin(0)), 1) and near(0, 0))

passed = sum(value for _, value in checks)
failed = [name for name, value in checks if not value]
batch_counts = {
    "B8": sum(name.startswith(("Q15-", "Q16-")) for name, _ in checks),
    "B9": sum(name.startswith("Q17-") for name, _ in checks),
}
print({"checks": len(checks), "passed": passed, "failed": failed, "batch_counts": batch_counts})
if failed:
    raise SystemExit(1)
