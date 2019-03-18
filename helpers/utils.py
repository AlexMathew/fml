def enum_to_choices(cls):
    return tuple(
        (e.value, e.name) for e in list(cls)
    )


def enum_to_dict(cls):
    return {
        e.value: e.name for e in list(cls)
    }
